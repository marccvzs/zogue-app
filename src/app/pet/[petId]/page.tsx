const PetIdPage = async (props: { params: Promise<{ petId :string }> }) => {
    const params = await props.params;

    const petId = params.petId;

    return (
        <div className="min-h-screen p-8">
            <h4>Pet ID: {petId}</h4>
        </div>
    )
};

export default PetIdPage;
