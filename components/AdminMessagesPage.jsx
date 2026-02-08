"use client";
import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Eye, Trash2, CheckCircle, Archive } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, read, replied
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/contact');
            const data = await res.json();
            
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    const updateMessageStatus = async (messageId, status) => {
        try {
            const res = await fetch(`/api/contact/${messageId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (res.ok) {
                toast.success('Status updated');
                fetchMessages();
            }
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    const deleteMessage = async (messageId) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`/api/contact/${messageId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success('Message deleted');
                fetchMessages();
                setSelectedMessage(null);
            }
        } catch (error) {
            toast.error('Failed to delete message');
        }
    };

    const filteredMessages = filter === 'all' 
        ? messages 
        : messages.filter(m => m.status === filter);

    const statusColors = {
        new: 'bg-blue-100 text-blue-700 border-blue-200',
        read: 'bg-gray-100 text-gray-700 border-gray-200',
        replied: 'bg-green-100 text-green-700 border-green-200',
        archived: 'bg-slate-100 text-slate-700 border-slate-200'
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
                    <p className="text-gray-600">
                        {messages.length} total messages • {messages.filter(m => m.status === 'new').length} unread
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                                filter === status
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                            {status === 'new' && messages.filter(m => m.status === 'new').length > 0 && (
                                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                    {messages.filter(m => m.status === 'new').length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Messages List */}
                    <div className="lg:col-span-1 space-y-3">
                        {loading ? (
                            <div className="text-center py-8">
                                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="bg-white p-8 rounded-lg text-center">
                                <p className="text-gray-500">No messages found</p>
                            </div>
                        ) : (
                            filteredMessages.map((message) => (
                                <div
                                    key={message._id}
                                    onClick={() => {
                                        setSelectedMessage(message);
                                        if (message.status === 'new') {
                                            updateMessageStatus(message._id, 'read');
                                        }
                                    }}
                                    className={`bg-white p-4 rounded-lg cursor-pointer hover:shadow-md transition-all border ${
                                        selectedMessage?._id === message._id
                                            ? 'border-blue-500 shadow-md'
                                            : 'border-gray-200'
                                    } ${message.status === 'new' ? 'bg-blue-50' : ''}`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-gray-900">
                                            {message.firstName} {message.lastName}
                                        </h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${statusColors[message.status]}`}>
                                            {message.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{message.email}</p>
                                    <p className="text-sm text-gray-700 font-medium mb-2">{message.subject}</p>
                                    <p className="text-sm text-gray-500 line-clamp-2">{message.message}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {new Date(message.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2">
                        {selectedMessage ? (
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {selectedMessage.firstName} {selectedMessage.lastName}
                                        </h2>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Mail size={16} />
                                                <a href={`mailto:${selectedMessage.email}`} className="hover:text-blue-600">
                                                    {selectedMessage.email}
                                                </a>
                                            </div>
                                            {selectedMessage.phone && (
                                                <div className="flex items-center gap-1">
                                                    <Phone size={16} />
                                                    <a href={`tel:${selectedMessage.phone}`} className="hover:text-blue-600">
                                                        {selectedMessage.phone}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full border font-semibold ${statusColors[selectedMessage.status]}`}>
                                        {selectedMessage.status}
                                    </span>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-1">Subject</p>
                                    <p className="font-semibold text-gray-900">{selectedMessage.subject}</p>
                                </div>

                                <div className="mb-6">
                                    <p className="text-sm text-gray-500 mb-2">Message</p>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs text-gray-500">
                                        Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => updateMessageStatus(selectedMessage._id, 'replied')}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                    >
                                        <CheckCircle size={18} />
                                        Mark as Replied
                                    </button>
                                    <button
                                        onClick={() => updateMessageStatus(selectedMessage._id, 'archived')}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                    >
                                        <Archive size={18} />
                                        Archive
                                    </button>
                                    <button
                                        onClick={() => deleteMessage(selectedMessage._id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                        Delete
                                    </button>
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        <Mail size={18} />
                                        Reply via Email
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <Eye size={48} className="mx-auto mb-4 opacity-20" />
                                    <p>Select a message to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
