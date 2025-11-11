C:\Users\Q\Desktop\tv-app\tvapp2\src\screens\Home.tsx in this file here is the data which comme from : const {data: userData, isLoading} = useQuery({
queryKey: ['clientTvData', roomNumber],
queryFn: () => getMeData(roomNumber!),
enabled: !!roomNumber
}) : client:{name: 'Mourad', room: '12', language: 'English', phone: '063748596', status: 'En séjour', createdAt: '2025-11-06T16:37:16.218Z'}

I want to store the room number which his id and date of creation which will find them in userData and remove the roomNumber when status !== 'En séjour'
