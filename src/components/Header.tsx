import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useRouteMatch } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 20px 70px;
  color: #fff;
  font-size: 16px;
  svg {
    cursor: pointer;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 120px;
  height: fit-content;
  margin-right: 36px;
  fill: ${(props) => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  a {
    padding: 2px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -10px;
  width: 6px;
  height: 6px;
  margin: 0 auto;
  border-radius: 50px;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.span`
  display: flex;
  align-items: center;
  position: relative;
  height: 40px;
  color: #fff;
  svg {
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  position: absolute;
  right: 0;
  width: 250px;
  padding: 6px 10px 6px 40px;
  border: 1px solid ${(props) => props.theme.white.grey};
  background-color: rgba(24, 24, 24, 0.8);
  color: ${(props) => props.theme.white.grey};
  line-height: 26px;
  transform-origin: right center;
  z-index: -1;
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0, 1],
  },
};

const navVariants = {
  top: { backgroundColor: "rgba(19,19,19,0" },
  scroll: { backgroundColor: "rgba(19,19,19,1" },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useRouteMatch("/");
  const tvMatch = useRouteMatch("/tv");
  const searchRef = useRef<HTMLSpanElement>(null);
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  useEffect(() => {
    // 다른 영역 클릭 시 서치 창 닫기
    const handleClickOutSide = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);

    // 스크롤 애니메이션
    scrollY.onChange(() => {
      if (scrollY.get() > 250) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  }, [scrollY]);

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Wrap>
        <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </Logo>
        <Items>
          <Item>
            <Link to="/">Home</Link>
            {homeMatch?.isExact && <Circle layoutId="circle" />}
          </Item>
          <Item>
            <Link to="/tv">Tv Shows</Link>
            {tvMatch && <Circle layoutId="circle" />}
          </Item>
        </Items>
      </Wrap>
      <Wrap>
        <Search ref={searchRef}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -216 : 0 }}
            transition={{ ease: "linear" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            animate={{ scaleX: searchOpen ? 1 : 0 }}
            transition={{ ease: "linear" }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
      </Wrap>
    </Nav>
  );
}

export default Header;
