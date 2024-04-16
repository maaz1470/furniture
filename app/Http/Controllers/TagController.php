<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
class TagController extends Controller
{
    public function layout(){
        return view('Backend.Layout');
    }

    public function addPage(){
        return view('Backend.Layout');
    }

    // Edit Page

    public function editPage(){
        return view('Backend.Layout');
    }

    protected function create_slug(string $slug){
        $url = Str::slug($slug);
        $check_tag = Tag::where('slug','=', $slug)->get();
        if($check_tag->count() > 0){
            $slug = $url . '-' . Tag::all()->count();
        }else{
            $slug = $url;
        }
        return $slug;
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name'  => 'required|string|max:255'
        ]);
        if($validator->fails()){
            return Response()->json([
                'status'    => 401,
                'errors'    => $validator->errors()->all()
            ]);
        }

        $tag = new Tag();
        $tag->name = $request->name;
        $tag->slug = $this->create_slug($request->name);
        $tag->keywords = $request->keywords;
        $tag->meta_title = $request->meta_title;
        $tag->meta_description = $request->meta_description;
        if($tag->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Tag Saved Successfully'
            ]);
        }
    }

    public function all(){
        $tags = Tag::all();
        return Response()->json([
            'status'    => 200,
            'tags'      => $tags
        ]);
    }

    // Edit Tag

    public function edit($id){
        $tag = Tag::where('id',$id)->first();
        if($tag){
            return Response()->json([
                'status'    => 200,
                'tag'       => $tag
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Tag not found'    
            ]);
        }
    }
}
