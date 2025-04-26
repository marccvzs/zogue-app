const EventPage = async (props: { params: Promise<{ eventName: string }> }) => {
    const params = await props.params;

  return (
    <div className="min-h-screen p-8">
        <div>
          <h2 className='text-2xl'>{params?.eventName}</h2>
          <div>
            Event details:
          </div>
        </div>
    </div>
  );
};

export default EventPage;
