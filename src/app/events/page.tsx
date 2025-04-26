const EventsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;

  return (
    <div className="min-h-screen bg-slate-200 p-8">
      Events Page {searchParams.zipCode ? `in ${searchParams.zipCode}` : ""}
    </div>
  );
};

export default EventsPage;
