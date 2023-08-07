import React from "react";
import Spinner from "../spinner";

interface Image {
  createdAt: string;
  image: {
    buffer: string;
    encoding: string;
    fieldname: string;
    mimetype: string;
    originalname: string;
    size: number;
  };
}

const apiUrl = process.env.REACT_APP_API_URL;

export default function Gallery() {
  const [image, setImage] = React.useState<Array<Image>>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [fullResImageURL, setFullResImageURL] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(true);

  const handleImages = async () => {
    const res = await fetch(`${apiUrl}/getImages`);
    return res.json();
  };

  const openModal = (fullResURL: string) => {
    setFullResImageURL(fullResURL);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  React.useEffect(() => {
    const abortController = new AbortController();

    const fetchImages = async () => {
      try {
        const getImages = await handleImages();
        if (getImages) setLoading(false);
        setImage(getImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    return () => {
      // Clean up the fetch if the component is unmounted
      abortController.abort();
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      ) : (
        <div className="columns-3 py-3">
          {image &&
            image.map((item, index) => (
              <img
                className="object-cover h-full w-full pt-3"
                key={index}
                loading="lazy"
                src={`data:image/jpeg;base64,${item.image.buffer}`}
                alt={""}
                onClick={() => openModal(item.image.buffer)}
              />
            ))}
          {modalOpen && (
            <div
              className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-70"
              onClick={closeModal}>
              <div className="bg-white p-4 rounded-md max-w-90vw max-h-90vh">
                <img
                  src={`data:image/jpeg;base64,${fullResImageURL}`}
                  alt="Full Resolution"
                  className="w-full h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
