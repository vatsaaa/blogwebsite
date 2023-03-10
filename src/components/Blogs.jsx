import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setBlogData,
    selectUserInput,
} from "../features/userSlice";
import axios from "axios";

import "../styling/blogs.css";
import "../styling/home.css";

const Blogs = () => {
    const searchInput = useSelector(selectUserInput);
    const opl_api = `https://gnews.io/api/v4/search?q=${searchInput}&lang=en&apikey=32f1fb200795ed81b30536722628543a`
    // const opl_api = `http://localhost:5000/api/v1/run`;
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(opl_api)
            .then((response) => {
                    dispatch(setBlogData(response.data));
                    setBlogs(response.data);
                    setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [searchInput]);

    var bodyFormData = new FormData();
    bodyFormData.append("user", "vatsaaa");
    bodyFormData.append("num_of_product", 5);
    bodyFormData.append("search_string", "Essential Oils; Garam Masala; Hair Oil");

    return (
        <div className="blog__page">
            <div className="blogs">
                {blogs && blogs.articles && blogs.articles.map((blog) => (
                    <a href={blog.url} className="blog" target="_blank" rel="noopener noreferrer">
                        <img src={blog.image} alt="Blog" width="200" height="230"/>
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name}</span>
                                <p>{blog.publishedAt}</p>
                                <h1>{blog.title}</h1>
                                <p>{blog.descripition}</p>
                            </h3>
                        </div>
                    </a>
                ))}

                {blogs && blogs.totalArticles === 0 && (
                    <h1 className="no__blogs">
                        No blogs available <span role="img" aria-label="sad">😔</span>, search something else to read blogs on the greatest platform.
                    </h1>
                )}
            </div>
        </div>
    );
};

export default Blogs;