import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from "./page";

const Err404: NextPageWithLayout<{ statusCode, err }> = ({ statusCode, err }) => {
    

    const style404 = {
        fontSize: "5em",
        marginBottom: "20px",
    }

    const styleButton: React.CSSProperties = {
        display: 'block',
        borderRadius: '5px',
        width: 'max-content',
        padding: '8px 15px',
        cursor: 'pointer',
        margin: '3% auto',
        fontSize: '0.75em',
        letterSpacing: '1px',
        background: 'linear-gradient(0deg, rgba(19, 1, 55, 0.5), rgba(19, 1, 55, 0.5))',
        border: '1px solid var(--newViolet)',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        textAlign: 'center',
    }
    
    console.error(`Error with status code: ${statusCode}`, err);

    return (
        <section style={{"display":"flex","justifyContent":"center","alignContent" : "center", "flexDirection":"column", "height": "100vh", "textAlign":"center", "width":"50vw", "margin":"auto"}}>
                <h3
                    style={style404}
                    >404</h3>
                <p 
                    style={{"letterSpacing":"1px"}}
                >
                    La pagina que estas buscando no se encuentra disponible. Podes volver al inicio haciendo click aqui.
                </p>
                <a href='/' style={styleButton}>VOLVER</a>
        </section>
    );
};

export default Err404;


Err404.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err : 404;
    return { statusCode, err };
};

Err404.getLayout = (page) => {
    return (
        <PrimaryLayout>
            {page}
        </PrimaryLayout>
    );
};
