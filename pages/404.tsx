import NotFound from "../components/Err404/NotFound";
import PrimaryLayout from "../components/layouts/primary/PrimaryLayout";

const NotFoundView = () => {

    return (
        <section>
            <NotFound />
        </section>
    );
};


export default NotFoundView;

NotFoundView.getLayout = (page) => {
    return (
        <PrimaryLayout>
          {page}
        </PrimaryLayout>
      );
  };