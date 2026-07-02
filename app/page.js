export default function Home() {
  return (
    <main style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "20px",
      fontFamily: "Arial"
    }}>
      
      <h1>World Talent Olympiad 2026</h1>

      <p>
        Submit your talent and get global recognition.
      </p>

      <form>

        <input
          placeholder="Full Name"
          style={inputStyle}
        />

        <input
          placeholder="Age"
          style={inputStyle}
        />

        <input
          placeholder="Country"
          style={inputStyle}
        />

        <input
          placeholder="WhatsApp Number"
          style={inputStyle}
        />

        <input
          placeholder="Email (Optional)"
          style={inputStyle}
        />

        <select style={inputStyle}>
          <option>Select Talent Category</option>
          <option>Singing</option>
          <option>Dancing</option>
          <option>Painting</option>
          <option>Acting</option>
          <option>Custom</option>
        </select>

        <input
          type="file"
          style={inputStyle}
        />

        <div style={{ marginTop: "20px" }}>
          <label>
            <input type="radio" name="payment" />
            {" "}I Have Paid
          </label>

          <br /><br />

          <label>
            <input type="radio" name="payment" />
            {" "}I Will Pay Later
          </label>
        </div>

        <button style={buttonStyle}>
          Submit
        </button>

      </form>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px"
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  marginTop: "20px",
  background: "black",
  color: "white",
  border: "none"
};
