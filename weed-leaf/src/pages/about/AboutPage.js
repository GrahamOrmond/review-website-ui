import { AppCard } from "../../components/AppCard";

export const AboutPage = ({ match }) => {
    const { page } = match.params;

    let title = "About";
    if(page != null){
        switch(page.toLowerCase()){
            case "user-agreement":
                title = "User Agreement"
                break;
            case "privacy-policy":
                title = "Privacy Policy"
                break;
        }
    }

    return (
       
            <div className="app-content">
                 <AppCard>
                    {title}
                 </AppCard>
            </div>
    )
  }
  