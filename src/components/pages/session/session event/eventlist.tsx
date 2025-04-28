"use client";

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

type Event = {
  id: string;
  title: string;
  date: string;
  audience: string;
  venue?: string;
  timeStatus: 'left' | 'ago';
  timeRemaining?: string;
  imageUrl: string;
};

export function EventList() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: '1',
      title: 'Cyber Security Tutorial',
      date: 'Wednesday, 06 July 2025',
      audience: 'Members',
      imageUrl: '/images/cyber-security.jpg',
      timeStatus: 'left',
      timeRemaining: '1d 12h 31m',
      venue: '1.0b 1'
    },
    {
      id: '2',
      title: 'Game Night',
      date: 'Wednesday, 06 July 2025',
      audience: 'Members',
      imageUrl: '/images/game-night.jpg',
      timeStatus: 'left',
      timeRemaining: '1d 12h 31m',
      venue: '1.0b 1'
    },
    {
      id: '3',
      title: 'Seminar',
      date: 'Wednesday, 06 July 2025',
      audience: 'Public',
      imageUrl: '/images/seminar.jpg',
      timeStatus: 'ago',
      timeRemaining: '1d 12h 3m',
      venue: '1.0b 1'
    },
    {
      id: '4',
      title: 'Dev Division',
      date: 'Wednesday, 06 July 2025',
      audience: 'Members',
      imageUrl: '/images/dev-division.jpg',
      timeStatus: 'left',
      timeRemaining: '1d 12h 31m',
      venue: '1.0b 1'
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/2 space-y-4">
        {events.map((event) => (
          <Card 
            key={event.id}
            className={`cursor-pointer transition-colors hover:bg-gray-50 ${
              selectedEvent?.id === event.id ? 'border-primar' : ''
            }`}
            onClick={() => setSelectedEvent(event)}
          >
            <CardHeader>
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">[{event.audience}]</span>
                {event.timeRemaining && (
                  <span className={`text-sm ${
                    event.timeStatus === 'ago' ? 'text-gray-500' : 'text-primary'
                  }`}>
                    {event.timeRemaining} {event.timeStatus}
                  </span>
                )}
              </div>
              {event.venue && (
                <p className="text-sm text-gray-500 mt-2">Venue: {event.venue}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="w-full md:w-1/2">
        {selectedEvent ? (
          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
              <p className="text-sm text-gray-500">{selectedEvent.date}</p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 rounded-md overflow-hidden">
                <img 
                  src={selectedEvent.imageUrl} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Audience: [{selectedEvent.audience}]</p>
                {selectedEvent.venue && (
                  <p className="text-sm text-gray-600 mt-1">Venue: {selectedEvent.venue}</p>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Select an event to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}