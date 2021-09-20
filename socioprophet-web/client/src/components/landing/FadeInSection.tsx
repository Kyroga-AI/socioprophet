import React, { useEffect } from 'react';
import './scss/scrollSection.scss';
interface Props {
  props: React.ReactNode;
  children: React.ReactNode;
}

const FadeInSection = (props: Props): JSX.Element => {
  const [isVisible, setVisible] = React.useState<boolean>(false);
  const domRef = React.useRef<any>();

  useEffect(() => {
    let mounted: boolean = true;

    const observer = new IntersectionObserver((entries) => {
      if (mounted) {
        entries.forEach((entry) => setVisible(entry.isIntersecting));
      }
    });
    observer.observe(domRef.current);

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`} ref={domRef}>
      {props.children}
    </div>
  );
};

export default FadeInSection;
