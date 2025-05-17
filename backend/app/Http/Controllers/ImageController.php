<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;

class ImageController extends Controller
{
    public function index()
    {
        $images = Image::all();
        return response()->json(['images' => $images], 200);
    }
    public function upload(Request $request)
    {
        // validation
        $result = 'something went work';
        if ($request->has('image')) {
            $image = $request->file('image');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $image->move('images/', $name);
            $result = Image::create(['name' => $name]);
        }
        if ($result) {
            return response()->json(['status' => true, 'message' => 'Uploaded successfully']);
        } else {
            return response()->json(['status' => false, 'message' => $result]);
        }
    }
}