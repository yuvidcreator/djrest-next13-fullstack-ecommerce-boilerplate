import Widgets from './widgets'
import Copyright from './copyright'
import { footerContemporary } from './data'
const { widgets, payment } = footerContemporary

const FooterTwo: React.FC = () => {
    return (
        <footer className='border-b-4 border-heading mt-9 md:mt-11 lg:mt-16 3xl:mt-20 pt-2.5 lg:pt-0 2xl:pt-6 bg-black'>
            <Widgets widgets={widgets} variant='contemporary' />
            <Copyright payment={payment} variant='contemporary' />
        </footer>
    )
}
export default FooterTwo
