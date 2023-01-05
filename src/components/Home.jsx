import React, { useEffect } from "react";
import IndexMap from "./IndexMap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getUsers, getPosts } from "../redux/actions/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";

function Number({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <animated.div className="inline-block">
      {number.to((n) => n.toFixed(0))}
    </animated.div>
  );
}

function Home() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-between bg-slate-200">
        <div className="ml-[5%]">
          <div className="flex flex-col justify-center w-full h-screen">
            <p className="mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl lg:text-4xl text-black">
              USUARIOS REGISTRADOS:{" "}
              <span className="text-yellow-500">
                <Number n={users.length} />
              </span>
            </p>
            <p className="mb-4 text-2xl font-extrabold tracking-tight leading-non md:text-3xl lg:text-4xl text-black">
              POSTEOS UNICOS:{" "}
              <span className="text-yellow-500">
                <Number n={posts.length} />
              </span>
            </p>
            <div className="flex flex-col text-center mt-10">
              <p className="text-2xl font-extrabold text-gray-900">
                HenryHouse es la casa de la comunidad <span className="text-yellow-500">HENRY</span>
              </p>
            </div>
          </div>
        </div>
        <IndexMap />
      </div>
      <Footer />
    </>
  );
}

export default Home;
