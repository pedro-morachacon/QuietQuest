import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  border: "1px solid green",
  margin: 12,
  padding: 8,
};

const Scroll = () => {
  const [dataSource, setDataSource] = useState(Array.from({ length: 20 }));

  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (dataSource.length < 200) {
      //Making API Call
      setTimeout(() => {
        setDataSource(dataSource.concat(Array.from({ length: 20 })));
      }, 500);
    } else {
      setHasMore(false);
    }
  };

  return (
    <div>
      <p>
        Title: <b>InfiniteScroll</b>
      </p>

      <div id="parentScrollDiv" style={{ height: 400, overflow: "auto" }}>
        <InfiniteScroll
          dataLength={dataSource.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>You are all set!</p>}
          // height={500}
          scrollableTarget="parentScrollDiv"
        >
          {dataSource.map((item, index) => {
            return (
              <div key={index} style={style}>
                This is a div #{index + 1} inside InfiniteScroll
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Scroll;
