import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 bg-gray-50">
            <Container>
                <div className="w-full flex flex-col items-center mb-6">
                    <div className="w-full max-w-4xl relative border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-64 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-4 top-4 flex space-x-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full max-w-4xl mx-auto mb-6 px-4">
                    <h1 className="text-4xl font-bold text-gray-800">{post.title}</h1>
                </div>
                <div className="w-full max-w-4xl mx-auto px-4">
                    <div className="prose lg:prose-xl">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
