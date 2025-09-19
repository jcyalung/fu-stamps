import TitleTextbox from "@/components/TitleTextbox";

export default function AboutPage() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#FFFBEF',
      display: 'block',
      padding: '80px',
      }}
    >
      <TitleTextbox>
        ABOUT FU-STAMPS
      </TitleTextbox>

      <TitleTextbox>
        FU-STAMPS DEVELOPERS
      </TitleTextbox>

      <TitleTextbox>
        FU-STAMPS DIRECTORY
      </TitleTextbox>
    </div>
  );
}
