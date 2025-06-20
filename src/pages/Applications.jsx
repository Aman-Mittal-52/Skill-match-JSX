import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserApplications } from '@/features/application/applicationSlice'
import { BigLoader } from '@/components/ui/BigLoader'
import { Building2, MapPin, Badge, Calendar } from 'lucide-react'
export function Applications() {
    const { applications, status, error } = useSelector((state) => state.application)
    const dispatch = useDispatch()

    // Filters and search state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedLocation, setSelectedLocation] = useState('all');

    useEffect(() => {
        dispatch(fetchUserApplications())
    }, [dispatch])

    // Get unique locations from applications
    const locations = Array.from(new Set(applications.map(app => app.jobId.location)));

    // Filter applications
    const filteredApplications = applications.filter(app => {
        // Status filter
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        // Location filter
        const matchesLocation = selectedLocation === 'all' || app.jobId.location === selectedLocation;
        // Search filter (job title or company)
        const matchesSearch =
            app.jobId.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.jobId.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesLocation && matchesSearch;
    });

    if (status === 'loading') {
        return <BigLoader />
    }

    if (status === 'failed') {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center text-red-600">
                    <h2 className="text-xl font-semibold">Error loading applications</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-2xl font-bold mb-4'>Applications</h1>
            {/* Filters and Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {/* Search Bar */}
                <div className="md:col-span-2">
                    <Input
                        placeholder="Search job title or company..."
                        className="bg-accent"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                {/* Status Filter */}
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="placed">Placed</SelectItem>
                    </SelectContent>
                </Select>
                {/* Location Filter */}
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="bg-background">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map(loc => (
                            <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {/* Applications Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredApplications.length === 0 ? (
                    <div className="col-span-full text-center py-12">
                        <h3 className="text-xl font-semibold mb-2">No applications found</h3>
                        <p className="text-gray-600">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    filteredApplications.map((app) => (
                        <Card key={app._id} className="hover:shadow-lg transition-shadow flex flex-col h-full">
                            <CardHeader>
                                <CardTitle className="text-xl">{app.jobId.title}</CardTitle>
                                <div className="text-lg text-muted-foreground flex gap-2 items-center">
                                    <Building2 className="h-4 w-4 mr-2" />
                                    {app.jobId.companyName}
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="space-y-2">
                                    <div className='flex flex-col p-3 gap-2 border rounded-md mb-6'>
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2" />
                                        <span className="font-semibold mr-2">
                                            Applied on:
                                        </span>
                                        {new Date(app.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex items-center text-gray-600">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {app.jobId.location}
                                    </div>
                                    </div>

                                    {
                                        app.status && (
                                            app.status === 'applied' ? (
                                                <div className="flex items-center text-xl bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    <Badge className={`h-4 w-4 mr-2`} />
                                                    <span className={`font-semibold mr-2`}>
                                                        Status:
                                                    </span> {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </div>
                                            ) : app.status === 'shortlisted' ? (
                                                <div className="flex items-center text-xl bg-green-100 text-green-800 px-2 py-1 rounded">
                                                    <Badge className={`h-4 w-4 mr-2`} />
                                                    <span className={`font-semibold mr-2`}>
                                                        Status:
                                                    </span> {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </div>
                                            ) : app.status === 'rejected' ? (
                                                <div className="flex items-center text-xl bg-red-100 text-red-800 px-2 py-1 rounded">
                                                    <Badge className={`h-4 w-4 mr-2`} />
                                                    <span className={`font-semibold mr-2`}>
                                                        Status:
                                                    </span> {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                                </div>
                                            ) : 'Error in status'
                                        )
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}