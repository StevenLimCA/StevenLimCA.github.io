import React from "react";
import AboutSection from "../../AboutSection/AboutSection";
import Hero from "../../Hero/Hero";
import ProjectSection from "../../ProjectSection/ProjectSection";
import SkillSection from "../../SkillSection/SkillSection";
import "./MainPage.scss";

export default function MainPage() {
  // const useOnScreen = (options) => {
  //   const ref = useRef();
  //   const [visible, setVisible] = useState(false);
  //   useEffect(() => {
  //     const observer = new IntersectionObserver(([entry]) => {
  //       setVisible(entry.isIntersecting);
  //     }, options);
  //     if (ref.current) {
  //       observer.observe(ref.current);
  //     }
  //     return () => {
  //       if (ref.current) {
  //         observer.unobserve(ref.current);
  //       }
  //     };
  //   }, [ref, options]);
  //   return [ref, visible];
  // };

  // const [ref, visible] = useOnScreen({ rootMargin: "-300px" });
  return (
    <div className="main-page">
      <Hero />
      <AboutSection />

      <ProjectSection />
      <SkillSection />
    </div>
  );
}
