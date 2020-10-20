import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

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


// const useStorage = (file) => {
//   const [progress, setProgress] = useState(0);
//   const [error, setError] = useState(null);
//   const [url, setUrl] = useState(null);

//   useEffect(() => {
//     const storageRef = projectStorage.ref().child(file.name).put(file);
//     const collectionRef = projectFirestore.collection('images')
    
//     storageRef.on('state_change', function(snapshot) {
//       var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log('Upload is ' + progress + '% done');
//     }, (error) => {
//         setError(error);
//     }, () => {
//       const url = storageRef.snapshot.ref.getDownloadURL()
//       collectionRef.add({url: url, createdAt: timestamp});
//       setUrl(url);
//     })
//   }, [file]);
//     return { progress, error, url };
//   };

// export default useStorage
