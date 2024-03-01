import Cookies from 'js-cookie'
import Header from '../HeaderAb'
import FooterSection from '../FooterSectionAb/index'
import './index.css'

const AccountSection = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <Header />
      <div className="account-section-bg-containerab">
        <h1 className="account-titleab">Account</h1>
        <hr className="rulerab" />
        <div className="membership-containerab">
          <p className="account-descriptionab">Membership:</p>
          <div className="user-details-containerab">
            <p className="account-detailsab">rahul@gmail.com</p>
            <p className="account-passwordab">Password : ************</p>
          </div>
        </div>
        <hr className="rulerab" />
        <div className="membership-containerab">
          <p className="account-descriptionab">Plan details:</p>
          <p className="account-detailsab">Premium</p>{' '}
          <p className="ultra-textab">Ultra HD</p>
        </div>
        <hr className="rulerab" />
        <div className="button-containerab">
          <button
            className="Logout-buttonab"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="account-footerab">
        <FooterSection />
      </div>
    </>
  )
}

export default AccountSection
