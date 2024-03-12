import React, { useState, useEffect } from "react";
import PostCard from "../Cards/PostCard";
import { useServerData } from "../../hooks/useFetchData/useFetchData";
import InfiniteScroll from "react-infinite-scroll-component";

const PostPage = () => {
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data,
    updateUrl,
  }: {
    data: { list: any[]; stop_running: boolean };
    updateUrl: (newUrl: string) => void;
  } = useServerData(`${process.env.REACT_APP_BASE_URL}/posts/${pageNumber}`);

  useEffect(() => {
    if (data.stop_running) {
      setHasMore(false);
    }
  }, [data]);

  const fetchData = async () => {
    try {
      updateUrl(`${process.env.REACT_APP_BASE_URL}/posts/${pageNumber + 1}`);
      setPageNumber(pageNumber + 1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={data.list.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more data to load</p>}
    >
      {data &&
        data.list.map((item, i) => {
          const { title, patient_description, num_hugs, post_url } = item;
          return (
            <PostCard
              title={title}
              patient_description={patient_description}
              num_hugs={num_hugs}
              url={post_url}
              key={i}
            />
          );
        })}
    </InfiniteScroll>
  );
};

export default PostPage;
