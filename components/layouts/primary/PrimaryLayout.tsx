import Head from 'next/head';
import styles from './PrimaryLayout.module.css';


export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({
  children,
  ...divProps
}) => {
  return (
    <>
      <Head>
        <title>Dragonchat Free</title>
      </Head>
      <div {...divProps} className={styles.galaxy_cont}>
        <main className="px-5">
          {children}
        </main>
      </div>

      {/* <ModalContainer>

      </ModalContainer> */}
    </>
  );
};

export default PrimaryLayout;
