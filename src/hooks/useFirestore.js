import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
	const [docs, setDocs] = useEffect([]);

  useEffect(() => {
    const unsub = projectFirestore.collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        //* onsnapshot akkor triggerelődik amikor a collection-ben változás történik
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
          //* egy dokumentum
        });
        setDocs(documents);
      });
		return () => unsub();

	}, [collection]);

  return { docs };
};

export default useFirestore;
