import React, { useEffect, useState } from 'react'
import { collection, addDoc, /* getDocs,*/ onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from 'fbase';
// , storage
import Tweet from 'components/Tweet';
import { v4 as uuidv4 } from 'uuid';
// import { ref, uploadString, getDownloadURL } from "firebase/storage";
import TweetInsert from 'components/TweetInsert';

function Home({userObj}) {//앱 - 라우터

  const [tweets, setTweets] = useState([]);

  // const getTweets = async () => {
  //   const querySnapshot = await getDocs(collection(db, "tweets"));
  //   querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);

  //     const tweetObject = {...doc.data(), id:doc.id}
  //     setTweets(prev => [tweetObject, ...prev]) //새 트윗을 가장 먼저 보여줌.(list 순서)
  //   });
  // }

  useEffect(()=>{ //실시간 적용//
    // getTweets();
    const q = query(collection(db, "tweets"),
                orderBy("createdAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
        console.log(newArray);
      });
      setTweets(newArray);
    });
  },[])

  return (
    <div className='container'>
    <TweetInsert userObj={userObj}/>
     <div>
      {tweets.map(tweet => (
        // <div key={tweet.id}>
        //   <h4>{tweet.text}</h4>
        // </div>
        <Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid}/> // 동일한 정보 로그인
      ))}
     </div>
     <footer>&copy; {new Date().getFullYear()} twitter app</footer>
    </div>
  )
}

export default Home