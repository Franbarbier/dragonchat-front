import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import MainCont from "../components/MainCont/MainCont";
import { NextPageWithLayout } from "./page";
import { GralProps } from "./_app";

const Login : NextPageWithLayout<GralProps> = (GralProps) => {
    return (
        <section>
            <MainCont width={90} maxWidth={400}>
                 {/* Contenedor temporario hastas que se libere el registro */}
                 <>
                    <h1>No es posible resgistrar una cuenta en este momento :(</h1>
                    <p style={{ 'borderBottom' : '1px solid #fff', 'textAlign' : 'center', "margin" : ' 5% auto', "display" : 'block', 'width':"max-content", "cursor":"pointer" }}
                    onClick={()=>{ window.location.href = "/login"  }}
                    >VOLVER</p>
                </>
                {/* <SignUpView /> */}
            </MainCont>
        </section>
    );
};


export default Login;

Login.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };