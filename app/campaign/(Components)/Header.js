import 'semantic-ui-css/semantic.min.css';
import Link from 'next/link';
export default function Header(){
    return (
        <div className="ui menu">
            <Link href="/campaign">
                <div className="item">mCampaign</div>
            </Link>
            <div className="right menu">
                <Link href="/campaign">
                    <div className="item">Camaigns</div>
                </Link>
                <Link href="/campaign/new">
                    <div className="item">+</div>
                </Link>
                
            </div>
        </div>
    );

}