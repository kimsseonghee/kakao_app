import { db, storage } from 'fbase';
import React, { useEffect, useState } from 'react'
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "styles/tweet.scss"

function Tweet(props) {
  // console.log("tweetObj->",tweetObj);
  console.log("props->",props);
  const {
    tweetObj:{
      createdAt, createdId, text, id, attachmentUrl}
    ,isOwner} = props;
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(text);
  const [nowDate, setNowDate] = useState(createdAt);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if(ok){
      const data = await deleteDoc(doc(db, "tweets", `/${id}`));
      if(attachmentUrl !== ""){
        const desertRef = ref(storage, attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  }

  
  const toggleEditing = () => setEditing ((prev) => !prev); //토글기능

  const onChange = (e) => {
    const {target:{value}} = e;
    setNewTweet(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const newTweetRef = doc(db, "tweets", `/${id}`);

    // Set the "capital" field of the city 'DC'
    await updateDoc(newTweetRef, {
      text: newTweet,
      createdAt :Date.now(),
    });
    setEditing(false)
  }

  useEffect(()=>{
    let timeStamp = createdAt;
    const now = new Date(timeStamp);
    setNowDate(now.toDateString());
    //toDateString(년월일), toUTCString(시간까지)
  },[])

  return (
    <div className='tweet'>
      {editing ? (
        //수정화면
        <>
          <form onSubmit={onSubmit} className='container tweetEdit'>
            <input type='text' onChange={onChange} value={newTweet} required className='formInput'/>
            <input type='submit' value='Update Tweet' className='formBtn'/>
          </form>
          <button onClick={toggleEditing} className='formBtn cancelBtn'>Cancel</button>
        </>
      ) : (
        //일반화면
        <>
          <h4>{text}</h4>
          {attachmentUrl && ( // 이미지 태그가 있는 경우만 나옴(엑박x)
              <img src={attachmentUrl} width="50" height="50" alt=""/>
          )}
          <span>{nowDate}</span>

          {isOwner && ( // 동일 로그인인 경우 편집 btn 보임
            <div className='tweet__actions'>
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon="fa-solid fa-trash"/>
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon="fa-solid fa-pencil"/>
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Tweet
