'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  FileText,
  TrendingUp,
  Search,
  Download,
  Eye,
  Filter,
  LogOut,
  BarChart3,
  Globe,
  BookOpen,
  GraduationCap,
} from 'lucide-react';
import { mockRegistrations, getRegistrationStats, searchRegistrations } from '@/lib/mock-registrations';
import { RegistrationData } from '@/types/registration';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRegistrations, setFilteredRegistrations] = useState<RegistrationData[]>(mockRegistrations);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'english' | 'kannada'>('all');
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationData | null>(null);

  const stats = getRegistrationStats();

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  useEffect(() => {
    // Filter registrations based on search and filter
    let results = mockRegistrations;

    if (searchQuery) {
      results = searchRegistrations(searchQuery);
    }

    if (selectedFilter !== 'all') {
      results = results.filter(r => r.language === (selectedFilter === 'english' ? 'en' : 'kn'));
    }

    setFilteredRegistrations(results);
  }, [searchQuery, selectedFilter]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    router.push('/admin');
  };

  const handleDownloadCSV = () => {
    // Generate CSV data
    const headers = [
      'Registration ID',
      'Student Name',
      'Email',
      'Phone',
      'Grade',
      'School',
      'City',
      'Category',
      'Language',
      'Parent Name',
      'Parent Email',
    ];

    const rows = filteredRegistrations.map(r => [
      r.registrationId,
      r.studentName,
      r.email,
      r.phone,
      r.grade,
      r.schoolName,
      r.schoolCity,
      r.category,
      r.language === 'en' ? 'English' : 'Kannada',
      r.parentName,
      r.parentEmail,
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `janapada-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">JANAPADA Admin</h1>
              <p className="text-sm text-gray-500">Competition Management Dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
            <p className="text-sm text-gray-500">Total Registrations</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.byLanguage.english}</h3>
            <p className="text-sm text-gray-500">English Language</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.byLanguage.kannada}</h3>
            <p className="text-sm text-gray-500">Kannada Language</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.byCategory.essay_writing}</h3>
            <p className="text-sm text-gray-500">Essay Writing</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Category Breakdown</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.byCategory.essay_writing}</p>
              <p className="text-sm text-gray-600">Essay Writing</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{stats.byCategory.short_story}</p>
              <p className="text-sm text-gray-600">Short Story</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">{stats.byCategory.poetry}</p>
              <p className="text-sm text-gray-600">Poetry</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">{stats.byCategory.creative_nonfiction}</p>
              <p className="text-sm text-gray-600">Creative Non-fiction</p>
            </div>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">All Registrations</h2>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search..."
                  />
                </div>

                {/* Filter */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedFilter('english')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === 'english'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setSelectedFilter('kannada')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedFilter === 'kannada'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Kannada
                  </button>
                </div>

                {/* Download CSV */}
                <button
                  onClick={handleDownloadCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.registrationId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {registration.registrationId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {registration.studentName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {registration.grade}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {registration.schoolName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {registration.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          registration.language === 'en'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {registration.language === 'en' ? 'English' : 'Kannada'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => setSelectedRegistration(registration)}
                        className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No registrations found</p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Detail Modal */}
      {selectedRegistration && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedRegistration(null)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Registration Details</h3>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {selectedRegistration.registrationId}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Student Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.studentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Grade</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.grade}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">+91 {selectedRegistration.phone}</p>
                  </div>
                </div>
              </div>

              {/* School Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">School Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">School Name</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.schoolName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">City</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.schoolCity}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500">State</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.schoolState}</p>
                  </div>
                </div>
              </div>

              {/* Parent Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Parent/Guardian Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.parentName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Relationship</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.relationship}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedRegistration.parentEmail}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">+91 {selectedRegistration.parentPhone}</p>
                  </div>
                </div>
              </div>

              {/* Competition Info */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Competition Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Category</p>
                    <p className="font-medium text-gray-900 capitalize">
                      {selectedRegistration.category.replace('_', ' ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Language</p>
                    <p className="font-medium text-gray-900">
                      {selectedRegistration.language === 'en' ? 'English' : 'Kannada'}
                    </p>
                  </div>
                  {selectedRegistration.referralSource && (
                    <div className="col-span-2">
                      <p className="text-gray-500">Referral Source</p>
                      <p className="font-medium text-gray-900">{selectedRegistration.referralSource}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedRegistration(null)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
