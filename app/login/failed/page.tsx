import { LoginFail } from "./components/LoginFail";

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let errorMessage =
    "etwas schief gelaufen, bitte kontaktieren Sie den Support.";

  if (searchParams?.err !== undefined) {
    const errorCode = searchParams["err"];
    switch (errorCode) {
      case "AuthApiError":
        errorMessage =
          "Oops! Es sieht so aus, als hätten Sie versucht, Ihren Magic Link von einem anderen Gerät oder Browser zu öffnen.";
        break;
      case "500":
        errorMessage =
          "etwas schief gelaufen, bitte kontaktieren Sie den Support.";
        break;
    }
  }

  return (
    <div className="flex flex-col flex-1 w-full h-[calc(100vh-73px)]">
      <LoginFail errorMessage={errorMessage} />
    </div>
  );
}
