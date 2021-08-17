import { gsap } from "gsap";

const useGsap = () => {
  const tl = gsap.timeline();

  return { tl };
};

export default useGsap;
