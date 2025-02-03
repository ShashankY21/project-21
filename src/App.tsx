import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatContextProvider } from '@/providers';
import Sidebar from '@/components/Sidebar';
import Main from '@/components/Main';
import SubmitVideoPage from '@/components/SubmitVideoPage';

const App = () => {
    return (
        <Router>
            <ChatContextProvider>
                <div className='flex h-screen w-screen'>
                    <Sidebar />
                    <div className='flex-1 overflow-auto'>
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/submit-video" element={<SubmitVideoPage />} />
                        </Routes>
                    </div>
                </div>
            </ChatContextProvider>
        </Router>
    );
};

export default App;

// import Main from '@/components/Main';
// import Sidebar from '@/components/Sidebar';

// const App = () => {
// 	return (
// 		<>
// 			<Sidebar />
// 			<Main />
// 		</>
// 	);
// };

// export default App;
