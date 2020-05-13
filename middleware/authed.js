export default function({ store, redirect }) {
  if (store.state.auth.user) {
    return redirect('/admin/dashboard')
  } else {
    return redirect('/admin/login')
  }
}