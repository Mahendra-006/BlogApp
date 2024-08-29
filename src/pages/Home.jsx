import React, { useEffect, useState } from 'react';
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components';

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center bg-gray-50">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[50vh]">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            No posts available
                        </h1>
                        <p className="text-lg text-gray-600">
                            Login to read posts or add new content.
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8 bg-gray-50">
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="col-span-1">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
