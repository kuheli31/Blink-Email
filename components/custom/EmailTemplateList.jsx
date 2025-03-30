import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";

function EmailTemplateList() {
  const [emailList, setEmailList] = useState([]);
  return (
    <div>
      <h2 className="font-bold text-xl text-primary mt-6">Workspace</h2>
      {emailList?.length == 0 && (
        <div className="flex justify-center mt-7 flex-col items-center">
          <Image src={"/email.png"} alt="email" height={1000} width={1000} />
          <Button className="mt-7">+ Create New</Button>
        </div>
      )}
    </div>
  );
}

export default EmailTemplateList;
