import React from "react";
import { Container, Sidebar, Gallery } from "./components";

function App() {
  return (
    <Container>
      <div className="grid md:grid-cols-4 grid-cols-1">
        <Sidebar />
        <div className="col-span-3">
          <Gallery />
        </div>
      </div>
    </Container>
  );
}

export default App;
