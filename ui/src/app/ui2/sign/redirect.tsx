import { GetServerSideProps } from "next";

const RedirectPage = () => {
  return null; // This page will never render
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/sign/email", // Replace with your destination page
      permanent: false, // Set to true if it's a permanent redirect (301)
    },
  };
};

export default RedirectPage;
