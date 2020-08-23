﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TeaCartWebApp.Controllers
{
    public class TeaCartController : Controller
    {
        // GET: TeaCart
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ItemMaster()
        {
            return View();
        }

        [HttpPost]
        public JsonResult UploadFile()
        {
            string Message, fileName;

            Message = fileName = string.Empty;

            bool flag = false;

            if (Request.Files != null)

            {

                var file = Request.Files[0];

                fileName = file.FileName;

                try

                {

                    file.SaveAs(Path.Combine(Server.MapPath("~/Images"), fileName));

                    Message = "File uploaded";

                    flag = true;

                }

                catch (Exception)

                {

                    Message = "File upload failed! Please try again";

                }

            }
            return new JsonResult { Data = new { Message = Message, Status = flag } };
        }

    }
}