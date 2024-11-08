import { Suspense, lazy } from "react";
import styles from "./Layout.module.css";
import loadingSvg from "../../assets/loading-spinner.svg";

const Header = lazy(() => import("../header/Header"));
const Now = lazy(() => import("../now/Now"));
const Forecast = lazy(() => import("../forecast/Forecast"));
const Highlights = lazy(() => import("../highlights/Highlights"));


function Loading() {
  return <img src={loadingSvg} alt="Loading..." />;
}

function Layout() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Header />
      </Suspense>
      <main className={`${styles.main} container`}>
        <section className={styles.leftContent}>
          <Suspense fallback={<Loading />}>
            <Now />
            
          </Suspense>
        </section>
        <section className={styles.rightContent}>
          <Suspense fallback={<Loading />}>
            <Highlights />
            <Forecast />
          </Suspense>
        </section>
      </main>

    </div>
  );
}

export default Layout;
