import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts from appwriteService
        appwriteService.getPosts().then((response) => {
            if (response) {
                setPosts(response.documents);
            }
        });
    }, []);

    return (
        <div className='w-full py-8 bg-gray-50'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.$id} className='col-span-1'>
                                <PostCard {...post} />
                            </div>
                        ))
                    ) : (
                        <div className='w-full text-center text-gray-600'>
                            <p className='text-lg font-medium'>No posts available</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
