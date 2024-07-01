import CustomColorBtn from '../CustomColorBtn/CustomColorBtn';
import styles from './PricingTable.module.css';

export interface IPricingTable {
    
}

const PricingTable: React.FC<IPricingTable> = ({ }) => {


    

    return (
        <div className={styles.PricingTableCont}>
           <div>
            <div>
                <h2>Pricing</h2>
            </div>
            <div className={styles.pricingsCont}>
                <div>
                    <div>
                        <h5>Pago Mensual</h5>

                        <span>Lorem ipsum dolor sit amet netto ui golk epsum.</span>

                        <div className={styles.precio}>
                            <h6>$</h6>
                            <h3>19</h3>
                            <h6>99</h6>
                        </div>
                        <span>por mes</span>
                        <CustomColorBtn
                            text="Pasar a 2.0"
                            backgroundColorInit={ "#c21c3b" }
                            backgroundColorEnd={ "#f9bd4f" }
                            borderColor={ "#e17846"}
                            onClick={()=>{ }}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <h5>Pago Anual</h5>

                        <span>Lorem ipsum dolor sit amet netto ui golk epsum.</span>

                        <div className={styles.precio}>
                            <h6>$</h6>
                            <h3>13</h3>
                            <h6>25</h6>
                        </div>
                        <span>por mes</span>
                        <CustomColorBtn
                            text="Pasar a 2.0"
                            backgroundColorInit={ "#c21c3b" }
                            backgroundColorEnd={ "#f9bd4f" }
                            borderColor={ "#e17846"}
                            onClick={()=>{ }}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <h5>Membership</h5>

                        <span>Lorem ipsum dolor sit amet netto ui golk epsum.</span>

                        <div className={styles.precio}>
                            <h6>$</h6>
                            <h3>150</h3>
                        </div>
                        <span>único pago</span>
                        <CustomColorBtn
                            text="Pasar a 2.0"
                            backgroundColorInit={ "#c21c3b" }
                            backgroundColorEnd={ "#f9bd4f" }
                            borderColor={ "#e17846"}
                            onClick={()=>{ }}
                        />
                    </div>
                </div>
            </div>
           </div>
         
        </div>
    );
}

export default PricingTable;

