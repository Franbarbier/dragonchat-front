import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";
import { NextPageWithLayout } from "./page";

const About : NextPageWithLayout = () => {
    return (
        <section>
            <h2>Hola compa</h2>
            <p>alexeagleson / nextjs-fullstack-app-template Public Code Issues 2 Pull requests 1 Actions Projects Security Insights nextjs-fullstack-app-template/pages/ Latest commit @alexeagleson alexeagleson feat: add global state example via context a232aeb on 12 Apr Git stats History Files Type Name Latest commit message Commit time . . api/search feat: implement search API and results page query 7 months ago results feat: implement search API and results page query 7 months ago _app.tsx feat: add global state example via context 7 months ago _document.tsx feat: add a custom _document 7 months ago globals.css feat: create Search component 7 months ago index.tsx feat: create results page and SearchResult component 7 months ago page.d.ts feat: implement page layouts 7 months ago</p>
        </section>
    );
};


export default About;

About.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };