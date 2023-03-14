import { connect } from 'react-redux'

export default function AuthGlobal(name: any) {
  const mapStateToProps = (state: any) => {
    return {
      accessToken: state.authReducer.accessToken,
    }
  }

  const mapActionToProps = (dispatch: any) => ({})
  return connect(mapStateToProps, mapActionToProps)(name)
}
