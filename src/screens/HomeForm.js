import Header from './Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomeForm() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const navigate = useNavigate();
    const style1 = {
        textAlign: 'center',
    };
    const style2 = {
        paddingBottom: 50,
        marginLeft: 100,
        marginRight: 100,
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);

        try {
            const response = await fetch('http://localhost:3001/process', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                alert('Invalid entry');
                console.log("Error occurred:", response.status);
            } else {
                const data = await response.json();
                console.log(data);
                alert('Success');
                setFile1(null);
                setFile2(null);
                navigate('/show')
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    return (
        <div>
            <Header />
            <div style={style1}>
                <h1 style={style2}>Excel Upload</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="formFile1" className="form-label">Company Details</label>
                    <div style={style2}>
                        <input name="file1" className="form-control form-control-lg" id="formFile1" type="file" onChange={(e) => setFile1(e.target.files[0])} />
                    </div>

                    <label htmlFor="formFile2" className="form-label">Contact Details</label>
                    <div style={style2}>
                        <input name="file2" className="form-control form-control-lg" id="formFile2" type="file" onChange={(e) => setFile2(e.target.files[0])} />
                    </div>
                    <div style={style2}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HomeForm;
