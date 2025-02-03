import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import videoData from '../../api.json';

const SubmitVideoPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className='flex h-screen w-full'>
            {/* Left Section (1/3 width) */}
            <div className='w-1/3 border-r border-black bg-white p-6'>
                <div className='flex h-full flex-col'>
                    <h1 className='text-2xl font-semibold'>Videos</h1>
                    
                    <button className='mt-6 flex w-full items-center gap-2 rounded-lg bg-brand-400 px-4 py-2 hover:bg-brand-500'>
                        <Plus size={20} />
                        <span>Add Videos</span>
                    </button>

                    <div className='mt-6 flex items-center gap-2 rounded-lg bg-brand-400 p-2'>
                        <Search size={20} />
                        <input
                            type='text'
                            placeholder='Search videos...'
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='w-full bg-transparent outline-none'
                        />
                    </div>

                    <hr className='my-6 border-black' />

                    <div className='flex-1 overflow-y-auto'>
                        {videoData.videos.map((video) => (
                            <div key={video.id} className='flex items-center gap-4 py-2'>
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className='h-16 w-16 rounded-lg object-cover'
                                />
                                <div>
                                    <h3 className='text-lg font-medium'>{video.title}</h3>
                                    <p className='text-sm text-gray-600'>{video.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section (2/3 width) */}
            <div className='w-2/3 bg-gray-50 p-6'>
                {/* Upload Section Placeholder */}
                <div className='h-full rounded-lg border-2 border-dashed border-gray-300 bg-white'>
                    <div className='flex h-full items-center justify-center text-gray-400'>
                        {/* File upload component will be implemented here */}
                        Video Preview/Upload Area
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitVideoPage;