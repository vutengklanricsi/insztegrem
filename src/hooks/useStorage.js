import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  
//   useEffect(() => {
//     const storageRef = projectStorage.ref(file.name);
//     const collectionRef = projectFirestore.collection('images');
//     var uploadTask = storageRef.child('images/' + file.name).put(file);
  
//     uploadTask.on('state_change', // or 'state_changed'
//     function(snapshot) {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     setProgress(percentage);
//     }, (error) => {
//     console.log(error);
//     setError(error);
//     }, () => {
//       const url = uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//         collectionRef.add({url: url, createdAt: timestamp});
//         setUrl(url);
//       })
//     })
//   }, [file]);
//   return { progress, error, url };
// }
  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection('images')

    storageRef.put(file).on("state_changed",(snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
      }, (error) => {
        // console.log(error);
        setError(error);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        collectionRef.add({url: url, createdAt: timestamp});
        setUrl(url);
      }
      // }, () => {
      //   // Upload completed successfully, now we can get the download URL
      //    const url = storageRef.getDownloadURL().then(function(downloadURL) {
      //     console.log('File available at', downloadURL);
      //     setUrl(url);
      //   });
      // }
    );
  }, [file]);
  return { progress, error, url };
};


export default useStorage;
