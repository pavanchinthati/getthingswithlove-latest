import Routes from "./Routes";
import { ToastContainer } from 'react-toastify';
import './App.scss';
import { HeaderProvider } from '@headerCustomizer';
import { Provider } from 'react-redux';
import configureStore from "./Redux/store/configureStore";
import 'react-toastify/dist/ReactToastify.css';

export const { store } = configureStore();

function App() {
  return (
    <div className="AppRoot" id='view-container'>
      <Provider store={store}>
        <HeaderProvider>
          <Routes />
        </HeaderProvider>
      </Provider>
      <ToastContainer
        className="toast-container"
        autoClose={2000}
        closeOnClick
        hideProgressBar={true}
        newestOnTop={true}
        pauseOnHover
        position="top-right"
        type="default"
        theme="colored"
        limit={1}
        style={{
          zIndex: 10000000,
        }}
      />
    </div>
  );
}

export default App;