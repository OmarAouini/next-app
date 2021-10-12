

//redirect to login if not authenticated with access cookies, to be userd inside getServerSideProps before operations
export const redirectIfUnauthenticated = (req, res) => {
    if (!req.cookies["access_token"] || !req.cookies["refresh_token"]) {
        console.log("does not have access cookies, unhautenticated, redirect to login...");
        res.writeHead(303, {Location: "/login"})
        res.end()
        return { props: {} }
      }
}