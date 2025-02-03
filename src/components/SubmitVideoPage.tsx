import { Plus, Search, Upload as UploadIcon } from 'lucide-react';
import { useState } from 'react';
import videoData from '../../api.json';
import { Progress } from '@/components/ui/progress';

const SubmitVideoPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddingVideo, setIsAddingVideo] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoDetails, setVideoDetails] = useState({
        title: '',
        description: '',
        language: 'English'
    });

    const filteredVideos = videoData.videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Existing file upload logic
    };

    return (
        <div className='flex h-screen w-full'>
            {/* Left Section (Always visible) */}
            <div className='w-1/3 border-r border-black bg-white p-6 overflow-y-auto'>
                <div className='flex h-full flex-col'>
                    {/* Header Section */}
                    <div className='flex items-center justify-between'>
                        <h1 className='text-3xl font-semibold'>Videos</h1>
                        <button 
                            onClick={() => setIsAddingVideo(!isAddingVideo)}
                            className='flex items-center gap-2 rounded-full bg-brand-400 px-6 py-3 hover:bg-brand-500'
                        >
                            <Plus size={20} />
                            <span>{isAddingVideo ? 'Cancel' : 'Add Videos'}</span>
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className='mt-6 flex items-center gap-2 rounded-full bg-brand-400 p-3'>
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

                    {/* Video List */}
                    <div className='flex-1 overflow-y-auto'>
                        {filteredVideos.map((video) => (
                            <div 
                                key={video.id} 
                                className='flex items-center gap-6 p-3 hover:bg-gray-100 rounded-xl'
                            >
                                <img
                                    src={video.thumbnail}
                                    alt={video.title}
                                    className='h-20 w-20 rounded-lg object-cover'
                                />
                                <div>
                                    <h3 className='text-xl font-semibold'>{video.title}</h3>
                                    <p className='text-md text-gray-600 mt-1'>{video.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section (Conditional) */}
            {isAddingVideo && (
    <div className='w-2/3 bg-gray-50 p-6 overflow-y-auto'>
        <div className='h-full flex flex-col gap-6'>
            {/* Video Details Form - Top Section */}
            <div className='grid grid-cols-4 gap-4 flex-none'>
                <div className='space-y-1'>
                    <label className='text-sm font-medium'>Title</label>
                    <input
                        value={videoDetails.title}
                        onChange={(e) => setVideoDetails({...videoDetails, title: e.target.value})}
                        className='w-full rounded-lg bg-brand-400 px-4 py-3 focus:outline-none'
                    />
                </div>
                <div className='col-span-2 space-y-1'>
                    <label className='text-sm font-medium'>Description</label>
                    <input
                        value={videoDetails.description}
                        onChange={(e) => setVideoDetails({...videoDetails, description: e.target.value})}
                        className='w-full rounded-lg bg-brand-400 px-4 py-3 focus:outline-none'
                    />
                </div>
                <div className='space-y-1'>
                    <label className='text-sm font-medium'>Language</label>
                    <select
                        value={videoDetails.language}
                        onChange={(e) => setVideoDetails({...videoDetails, language: e.target.value})}
                        className='w-full rounded-lg bg-brand-400 px-4 py-3 focus:outline-none'
                    >
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                    </select>
                </div>
            </div>

            {/* File Upload Area - Middle Section */}
            <div className='flex-1 rounded-xl border-2 border-dashed border-gray-300 bg-white p-8'>
                <div className='flex h-full flex-col items-center justify-center gap-4'>
                    <div className='text-center'>
                        <p className='text-lg font-medium'>Choose a file or drag it here</p>
                        <p className='text-sm text-gray-500 mt-2'>Supported file types: .mp4</p>
                    </div>
                    
                    <label className='cursor-pointer'>
                        <input 
                            type='file' 
                            className='hidden' 
                            accept='.mp4' 
                            onChange={handleFileUpload}
                        />
                        <div className='h-16 w-16 rounded-full bg-brand-400 flex items-center justify-center hover:bg-brand-500'>
                            <UploadIcon className='h-8 w-8' />
                        </div>
                    </label>
                </div>
            </div>

            {/* Upload Progress - Bottom 1/3 Section */}
            <div className='h-32 flex-none'> {/* Fixed height for progress section */}
                {uploadProgress > 0 && (
                    <div className='rounded-xl bg-brand-400 p-4 h-full flex flex-col justify-between'>
                        <h3 className='font-medium'>{videoDetails.title || 'Untitled Video'}</h3>
                        <div>
                            <Progress value={uploadProgress} className='h-2 bg-gray-200' />
                            <span className='text-sm mt-2 block'>{uploadProgress}% Complete</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
)}
        </div>
    );
};

export default SubmitVideoPage;