var jd_rt="jade-runtime";define([jd_rt],function(){return function(e){var t=[],n=e||{},r=n.candidate,i=r.fb_id||r.id;return t.push('<div class="profile_pic"><img'+jade.attrs({src:""+r.picture_small+"",width:"50",height:"50"},{src:!0,width:!0,height:!0})+'/></div><span class="name">'+jade.escape(null==(jade.interp=r.name)?"":jade.interp)+"</span>"),t.join("")}});