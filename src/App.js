import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [post, setPost] = useState([]);
  const [userTitleData, setUserTitleData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => setUser(json));

      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => setPost(json));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const arr = [];

    if (user.length > 0 && post.length > 0) {
      post.map((item, index) => {
        //console.log("item", item);
        let obj = {};

        user.filter((s, i) => {
          // console.log("SSSS", s);
          // console.log("III", i);

          if (s.id === item.userId) {
            obj["username"] = s.username;
            obj["title"] = item.title;
          }
        });

        arr.push(obj);
      });
      setUserTitleData(arr);
    }
  }, [user, post]);

  return (
    <div className="App">
      {
        //console.log("data", userTitleData)
        userTitleData
          ? userTitleData.map((item, index) => {
              return (
                <div>
                  <div>User: {item.username}</div>
                  <div>
                    Post:
                    {item.title}
                  </div>
                  <hr />
                </div>
              );
            })
          : ""
      }
    </div>
  );
}

export default App;
